'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '@/app/providers';
import SectionHeader from './SectionHeader';
import Icon from './Icon';

type FormState = {
  caseType: string;
  message: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
};

const initial: FormState = {
  caseType: '',
  message: '',
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
};

export default function Contact() {
  const { dict, locale } = useI18n();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const stepValid = useMemo(() => {
    if (step === 1) return form.caseType && form.message.trim().length > 5;
    if (step === 2) return form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.phone.trim();
    if (step === 3) return form.date && form.time;
    return false;
  }, [step, form]);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const next = () => stepValid && setStep((s) => Math.min(totalSteps, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stepValid) return;
    // Demo: simulate async submit
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 border-t border-gold/10">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionHeader eyebrow={dict.contact.eyebrow} title={dict.contact.title} subtitle={dict.contact.subtitle} />

        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* contact info column */}
          <div className="lg:col-span-4 card-elite p-8 space-y-6">
            <div className="numeral text-2xl text-bone">
              {locale === 'ar' ? 'تواصل مباشر' : 'Direct line'}
            </div>
            <div className="hairline w-20" />
            <ul className="space-y-5 text-bone/75">
              <li className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full grid place-items-center bg-ink-800 ring-1 ring-gold/30 text-gold">
                  <Icon name="phone" size={16} />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-bone/45 mb-1">
                    {locale === 'ar' ? 'هاتف' : 'Phone'}
                  </div>
                  <a href={`tel:${dict.footer.phoneHref}`} className="hover:text-gold transition" dir="ltr">
                    {dict.footer.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full grid place-items-center bg-ink-800 ring-1 ring-gold/30 text-gold">
                  <Icon name="whatsapp" size={16} />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-bone/45 mb-1">
                    {dict.footer.whatsapp}
                  </div>
                  <a
                    href={`https://wa.me/${dict.footer.phoneHref.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition"
                    dir="ltr"
                  >
                    {dict.footer.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full grid place-items-center bg-ink-800 ring-1 ring-gold/30 text-gold">
                  <Icon name="mail" size={16} />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-bone/45 mb-1">
                    {locale === 'ar' ? 'البريد' : 'Email'}
                  </div>
                  <a href={`mailto:${dict.footer.email}`} className="hover:text-gold transition">
                    {dict.footer.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full grid place-items-center bg-ink-800 ring-1 ring-gold/30 text-gold">
                  <Icon name="pin" size={16} />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-bone/45 mb-1">
                    {locale === 'ar' ? 'العنوان' : 'Address'}
                  </div>
                  <span>{dict.footer.address}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full grid place-items-center bg-ink-800 ring-1 ring-gold/30 text-gold">
                  <Icon name="clock" size={16} />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-bone/45 mb-1">{dict.footer.hours}</div>
                  <span>{dict.footer.hoursValue}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* form column */}
          <div className="lg:col-span-8 card-elite p-8 lg:p-10 relative overflow-hidden">
            {/* progress */}
            <div className="flex items-center justify-between mb-2 text-sm text-bone/55">
              <span>
                {dict.contact.step} {step} {dict.contact.of} {totalSteps}
              </span>
              <span className="text-gold tracking-widest text-xs">
                {step === 1
                  ? dict.contact.step1Title
                  : step === 2
                  ? dict.contact.step2Title
                  : dict.contact.step3Title}
              </span>
            </div>
            <div className="h-1 w-full rounded-full bg-ink-700 overflow-hidden mb-8">
              <motion.div
                className="h-full bg-gold-gradient"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-10"
                >
                  <div className="mx-auto w-16 h-16 rounded-full grid place-items-center bg-gold-gradient text-ink mb-6">
                    <Icon name="check" size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="numeral text-3xl text-bone mb-3">{dict.contact.success}</h3>
                  <p className="text-bone/65 max-w-md mx-auto">{dict.contact.successBody}</p>
                </motion.div>
              ) : (
                <motion.form
                  key={step}
                  onSubmit={step === totalSteps ? submit : (e) => e.preventDefault()}
                  initial={{ opacity: 0, x: locale === 'ar' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  {step === 1 && (
                    <>
                      <div>
                        <label className="lbl">{dict.contact.fields.caseType}</label>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {dict.contact.fields.caseTypes.map((t) => (
                            <button
                              type="button"
                              key={t}
                              onClick={() => update('caseType', t)}
                              className={`text-start rounded-xl border px-4 py-3 transition ${
                                form.caseType === t
                                  ? 'border-gold bg-gold/10 text-bone'
                                  : 'border-gold/15 hover:border-gold/45 text-bone/75'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="lbl">{dict.contact.fields.message}</label>
                        <textarea
                          className="field min-h-32"
                          rows={5}
                          value={form.message}
                          onChange={(e) => update('message', e.target.value)}
                          placeholder={locale === 'ar' ? 'اشرح حالتك بإيجاز...' : 'Briefly describe your matter...'}
                        />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <label className="lbl">{dict.contact.fields.name}</label>
                        <input
                          className="field"
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          placeholder={locale === 'ar' ? 'الاسم بالكامل' : 'Full name'}
                        />
                      </div>
                      <div>
                        <label className="lbl">{dict.contact.fields.email}</label>
                        <input
                          className="field"
                          type="email"
                          dir="ltr"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label className="lbl">{dict.contact.fields.phone}</label>
                        <input
                          className="field"
                          type="tel"
                          dir="ltr"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          placeholder="+20 ..."
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="lbl">{dict.contact.fields.date}</label>
                        <input
                          className="field"
                          type="date"
                          value={form.date}
                          onChange={(e) => update('date', e.target.value)}
                          min={new Date().toISOString().slice(0, 10)}
                        />
                      </div>
                      <div>
                        <label className="lbl">{dict.contact.fields.time}</label>
                        <div className="grid grid-cols-2 gap-2">
                          {dict.contact.fields.times.map((t) => (
                            <button
                              type="button"
                              key={t}
                              onClick={() => update('time', t)}
                              className={`rounded-xl border px-3 py-3 text-sm transition ${
                                form.time === t
                                  ? 'border-gold bg-gold/10 text-bone'
                                  : 'border-gold/15 hover:border-gold/45 text-bone/75'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6">
                    <button
                      type="button"
                      onClick={back}
                      disabled={step === 1}
                      className={`btn-ghost ${step === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                      {dict.contact.back}
                    </button>
                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={next}
                        disabled={!stepValid}
                        className={`btn-gold ${!stepValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {dict.contact.next}
                        <Icon name="arrow" className={locale === 'ar' ? 'rotate-180' : ''} size={16} />
                      </button>
                    ) : (
                      <button type="submit" disabled={!stepValid} className={`btn-gold ${!stepValid ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {dict.contact.submit}
                        <Icon name="check" size={16} strokeWidth={2.5} />
                      </button>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
