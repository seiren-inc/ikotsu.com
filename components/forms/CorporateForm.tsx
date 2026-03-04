'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { trackFormSubmit } from '@/lib/analytics/gtag';
import styles from './CorporateForm.module.css';

type InquiryType = 'consultation' | 'document';
type CorporateType = 'temple' | 'ossuary' | 'cemetery' | 'funeral' | 'other';
type RequestedModel = 'outsource' | 'partnership' | 'bulk' | 'other';

interface FormState {
  inquiry_type: InquiryType;
  corporate_name: string;
  contact_person: string;
  position: string;
  phone: string;
  email: string;
  monthly_volume: string;
  corporate_type: CorporateType | '';
  requested_model: RequestedModel | '';
  message: string;
}

interface FieldErrors {
  corporate_name?: string;
  contact_person?: string;
  email?: string;
  message?: string;
}

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.corporate_name.trim()) errors.corporate_name = '法人名を入力してください。';
  if (!form.contact_person.trim()) errors.contact_person = '担当者名を入力してください。';
  if (!form.email.trim()) {
    errors.email = 'メールアドレスを入力してください。';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'メールアドレスの形式が正しくありません。';
  }
  // 資料請求の場合はメッセージは任意にする
  if (form.inquiry_type === 'consultation' && !form.message.trim()) {
    errors.message = 'ご相談内容を入力してください。';
  }
  return errors;
}

export default function CorporateForm() {
  const [form, setForm] = useState<FormState>({
    inquiry_type: 'consultation',
    corporate_name: '',
    contact_person: '',
    position: '',
    phone: '',
    email: '',
    monthly_volume: '',
    corporate_type: '',
    requested_model: '',
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

    // 資料請求の場合は先頭に識別用テキストを付ける
    const prefix = form.inquiry_type === 'document' ? '【資料請求】\n' : '';
    const finalMessage = prefix + form.message.trim();

    const { error } = await supabase.from('inquiries_b2b').insert({
      corporate_name: form.corporate_name.trim(),
      contact_person: form.contact_person.trim(),
      position: form.position.trim() || null,
      phone: form.phone.trim() || null,
      email: form.email.trim(),
      monthly_volume: form.monthly_volume ? parseInt(form.monthly_volume, 10) : null,
      corporate_type: form.corporate_type || null,
      requested_model: form.requested_model || null,
      message: finalMessage,
    });

    if (error) {
      setStatus('error');
      return;
    }
    trackFormSubmit(form.inquiry_type === 'document' ? 'document_request_b2b' : 'contact_b2b');
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className={styles.success} role="alert">
        <span className={styles.successIcon} aria-hidden="true">✓</span>
        <h3 className={styles.successTitle}>
          {form.inquiry_type === 'document' ? '資料請求を承りました' : '送信が完了しました'}
        </h3>
        <p className={styles.successText}>
          {form.inquiry_type === 'document'
            ? 'ご入力いただいたメールアドレス宛に、資料のダウンロード案内をお送りいたします。届かない場合は迷惑メールフォルダもご確認ください。\nその他ご不明点がありましたら、お気軽にお問い合わせください。'
            : 'お問い合わせありがとうございます。内容を確認のうえ、2営業日以内に専任担当者よりご連絡いたします。'}
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Inquiry Type (Radio) */}
      <div className={styles.field}>
        <label className={styles.label}>
          お問い合わせ種別 <span className={styles.required}>必須</span>
        </label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="inquiry_type"
              value="consultation"
              checked={form.inquiry_type === 'consultation'}
              onChange={handleChange}
              className={styles.radioInput}
            />
            <span>ご相談・お見積り</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="inquiry_type"
              value="document"
              checked={form.inquiry_type === 'document'}
              onChange={handleChange}
              className={styles.radioInput}
            />
            <span>法人向けサービス資料ダウンロード</span>
          </label>
        </div>
      </div>

      <div className={styles.row}>
        {/* Corporate Name */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="corp-name">
            法人名・団体名 <span className={styles.required}>必須</span>
          </label>
          <input
            id="corp-name"
            name="corporate_name"
            type="text"
            className={`${styles.input} ${errors.corporate_name ? styles.inputError : ''}`}
            value={form.corporate_name}
            onChange={handleChange}
            placeholder="〇〇寺・〇〇葬儀社"
            autoComplete="organization"
          />
          {errors.corporate_name && (
            <span className={styles.errorMsg} role="alert">{errors.corporate_name}</span>
          )}
        </div>

        {/* Contact Person */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="corp-person">
            担当者名 <span className={styles.required}>必須</span>
          </label>
          <input
            id="corp-person"
            name="contact_person"
            type="text"
            className={`${styles.input} ${errors.contact_person ? styles.inputError : ''}`}
            value={form.contact_person}
            onChange={handleChange}
            placeholder="山田 太郎"
            autoComplete="name"
          />
          {errors.contact_person && (
            <span className={styles.errorMsg} role="alert">{errors.contact_person}</span>
          )}
        </div>
      </div>

      <div className={styles.row}>
        {/* Position */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="corp-position">
            役職 <span className={styles.optional}>任意</span>
          </label>
          <input
            id="corp-position"
            name="position"
            type="text"
            className={styles.input}
            value={form.position}
            onChange={handleChange}
            placeholder="住職 / 代表 / 担当者"
          />
        </div>

        {/* Phone */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="corp-phone">
            電話番号 <span className={styles.optional}>任意</span>
          </label>
          <input
            id="corp-phone"
            name="phone"
            type="tel"
            className={styles.input}
            value={form.phone}
            onChange={handleChange}
            placeholder="03-0000-0000"
            autoComplete="tel"
          />
        </div>
      </div>

      {/* Email */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="corp-email">
          メールアドレス <span className={styles.required}>必須</span>
        </label>
        <input
          id="corp-email"
          name="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          value={form.email}
          onChange={handleChange}
          placeholder="info@example.com"
          autoComplete="email"
        />
        {errors.email && (
          <span className={styles.errorMsg} role="alert">{errors.email}</span>
        )}
      </div>

      <div className={styles.row}>
        {/* Corporate Type */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="corp-type">
            法人区分 <span className={styles.optional}>任意</span>
          </label>
          <select
            id="corp-type"
            name="corporate_type"
            className={styles.select}
            value={form.corporate_type}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            <option value="temple">寺院</option>
            <option value="ossuary">納骨堂</option>
            <option value="cemetery">霊園・墓地</option>
            <option value="funeral">葬儀社</option>
            <option value="other">その他</option>
          </select>
        </div>

        {/* Monthly Volume */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="corp-volume">
            月間想定依頼件数 <span className={styles.optional}>任意</span>
          </label>
          <input
            id="corp-volume"
            name="monthly_volume"
            type="number"
            min="1"
            className={styles.input}
            value={form.monthly_volume}
            onChange={handleChange}
            placeholder="例：10"
          />
        </div>
      </div>

      {/* Requested Model */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="corp-model">
          ご希望の契約モデル <span className={styles.optional}>任意</span>
        </label>
        <select
          id="corp-model"
          name="requested_model"
          className={styles.select}
          value={form.requested_model}
          onChange={handleChange}
        >
          <option value="">選択してください</option>
          <option value="outsource">業務委託（単発依頼）</option>
          <option value="partnership">提携（継続取引）</option>
          <option value="bulk">まとめ依頼（一括契約）</option>
          <option value="other">未定・相談したい</option>
        </select>
      </div>

      {/* Message */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="corp-message">
          {form.inquiry_type === 'document' ? 'ご質問・ご要望など' : 'ご相談内容'}{' '}
          {form.inquiry_type === 'consultation' && <span className={styles.required}>必須</span>}
          {form.inquiry_type === 'document' && <span className={styles.optional}>任意</span>}
        </label>
        <textarea
          id="corp-message"
          name="message"
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          value={form.message}
          onChange={handleChange}
          rows={5}
          placeholder={form.inquiry_type === 'document' ? '資料送付にあたり、事前にお伝えしたいことがあればご記入ください。' : '依頼の背景・現状の課題・ご希望をご記入ください。'}
        />
        {errors.message && (
          <span className={styles.errorMsg} role="alert">{errors.message}</span>
        )}
      </div>

      <p className={styles.privacyNote}>
        送信内容は<a href="/legal/privacy" className={styles.privacyLink} target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>に基づき適切に管理します。
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
        {status === 'loading' ? '送信中…' : (form.inquiry_type === 'document' ? '資料を請求する' : '送信する')}
      </button>
    </form>
  );
}
