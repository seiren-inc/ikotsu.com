'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { trackFormSubmit } from '@/lib/analytics/gtag';
import styles from './ContactForm.module.css';

type ServiceType = 'powdered' | 'cleaning' | 'carrying' | 'takeout' | 'other';

interface FormState {
  name: string;
  email: string;
  phone: string;
  inquiry_type: ServiceType | '';
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = 'お名前を入力してください。';
  if (!form.email.trim()) {
    errors.email = 'メールアドレスを入力してください。';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'メールアドレスの形式が正しくありません。';
  }
  if (!form.message.trim()) errors.message = 'ご相談内容を入力してください。';
  return errors;
}

export default function ContactForm({ defaultService }: { defaultService?: ServiceType }) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    inquiry_type: defaultService ?? '',
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus('loading');

    const { error } = await supabase.from('inquiries_b2c').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      inquiry_type: form.inquiry_type || null,
      message: form.message.trim(),
    });

    if (error) {
      setStatus('error');
      return;
    }
    trackFormSubmit('contact_b2c');
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className={styles.success} role="alert">
        <span className={styles.successIcon} aria-hidden="true">✓</span>
        <h2 className={styles.successTitle}>送信が完了しました</h2>
        <p className={styles.successText}>
          お問い合わせありがとうございます。<br />
          内容を確認のうえ、2営業日以内にご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-name">
          お名前 <span className={styles.required}>必須</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          value={form.name}
          onChange={handleChange}
          placeholder="山田 太郎"
          autoComplete="name"
        />
        {errors.name && <span className={styles.errorMsg} role="alert">{errors.name}</span>}
      </div>

      {/* Email */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-email">
          メールアドレス <span className={styles.required}>必須</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          autoComplete="email"
        />
        {errors.email && <span className={styles.errorMsg} role="alert">{errors.email}</span>}
      </div>

      {/* Phone */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-phone">
          電話番号 <span className={styles.optional}>任意</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          className={styles.input}
          value={form.phone}
          onChange={handleChange}
          placeholder="090-0000-0000"
          autoComplete="tel"
        />
      </div>

      {/* Service Type */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-service">
          ご相談のサービス <span className={styles.optional}>任意</span>
        </label>
        <select
          id="contact-service"
          name="inquiry_type"
          className={styles.select}
          value={form.inquiry_type}
          onChange={handleChange}
        >
          <option value="">選択してください</option>
          <option value="powdered">粉骨</option>
          <option value="cleaning">洗骨</option>
          <option value="carrying">出張・搬送</option>
          <option value="takeout">お引取り</option>
          <option value="other">その他・未定</option>
        </select>
      </div>

      {/* Message */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-message">
          ご相談内容 <span className={styles.required}>必須</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          value={form.message}
          onChange={handleChange}
          rows={6}
          placeholder="ご相談の内容をお書きください。遺骨の量・状態・ご希望などをお知らせいただくとスムーズにご案内できます。"
        />
        {errors.message && <span className={styles.errorMsg} role="alert">{errors.message}</span>}
      </div>

      {/* Privacy note */}
      <p className={styles.privacyNote}>
        送信内容は<a href="/legal" className={styles.privacyLink}>プライバシーポリシー</a>に基づき適切に管理します。
      </p>

      {status === 'error' && (
        <p className={styles.submitError} role="alert">
          送信に失敗しました。しばらく経ってから再度お試しいただくか、お電話にてご連絡ください。
        </p>
      )}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? '送信中…' : '送信する'}
      </button>
    </form>
  );
}
