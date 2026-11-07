import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { connect } from '../data/siteContent.js';
import EmailChooser from './EmailChooser.jsx';

// Add, remove, or reorder form fields here.
const FIELDS = [
  { name: 'fullName', label: 'Full Name', type: 'text', autoComplete: 'name', required: true },
  { name: 'affiliation', label: 'Institutional Affiliation', type: 'text', autoComplete: 'organization' },
  { name: 'email', label: 'Email Address', type: 'email', autoComplete: 'email', required: true },
  { name: 'inquiryType', label: 'Nature of Inquiry', type: 'select', options: connect.inquiryTypes, required: true },
  { name: 'message', label: 'Message', type: 'textarea', required: true },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = Object.fromEntries(FIELDS.map((f) => [f.name, '']));

function validate(v) {
  const e = {};
  if (!v.fullName.trim()) e.fullName = 'Enter your full name.';
  if (!v.email.trim()) e.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(v.email)) e.email = 'Enter a valid email address, like name@example.org.';
  if (!v.inquiryType) e.inquiryType = 'Choose the nature of your inquiry.';
  if (v.message.trim().length < 10) e.message = 'Write a message of at least 10 characters.';
  return e;
}

/** Turn the form values into a ready-to-send email draft. */
function buildDraft(v) {
  const affiliation = v.affiliation.trim();
  const body = [
    `Name: ${v.fullName.trim()}`,
    affiliation ? `Institutional affiliation: ${affiliation}` : null,
    `Email: ${v.email.trim()}`,
    `Nature of inquiry: ${v.inquiryType}`,
    '',
    'Message:',
    v.message.trim(),
    '',
    'Sent via the AGAP Foundation website.',
  ].filter((line) => line !== null).join('\n');

  return {
    to: connect.emails[0],
    subject: `AGAP website inquiry — ${v.inquiryType}`,
    body,
  };
}

function Field({ field, value, error, onChange }) {
  const id = `inquiry-${field.name}`;
  const common = {
    id,
    name: field.name,
    value,
    onChange,
    required: field.required,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
  };
  return (
    <div className={`field ${field.type === 'textarea' ? 'field--wide' : ''}`} data-invalid={Boolean(error)}>
      <label htmlFor={id}>
        {field.label}
        {!field.required && <span className="field__optional"> (optional)</span>}
      </label>
      {field.type === 'select' ? (
        <select {...common}>
          <option value="" disabled>Select an option</option>
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea {...common} rows={5} />
      ) : (
        <input {...common} type={field.type} autoComplete={field.autoComplete} />
      )}
      {error && <p id={`${id}-error`} className="field__error">{error}</p>}
    </div>
  );
}

/** `topic` / `onTopicChange` let a parent (the topic chips in Connect) drive the inquiry type. */
export default function InquiryForm({ topic = '', onTopicChange }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState(null);
  const [chooserOpen, setChooserOpen] = useState(false);
  const [openedWith, setOpenedWith] = useState('');

  useEffect(() => {
    if (!topic) return;
    setValues((v) => ({ ...v, inquiryType: topic }));
    setErrors((prev) => ({ ...prev, inquiryType: undefined }));
    setOpenedWith('');
  }, [topic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (name === 'inquiryType') onTopicChange?.(value);
    if (openedWith) setOpenedWith('');
  };

  /** Validate, then ask which email service to hand the draft to. */
  const openChooser = () => {
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setOpenedWith('');
      return;
    }
    setDraft(buildDraft(values));
    setChooserOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openChooser();
  };

  return (
    <>
      <motion.form
        className="form"
        onSubmit={handleSubmit}
        noValidate
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {FIELDS.map((field) => (
          <Field key={field.name} field={field} value={values[field.name]} error={errors[field.name]} onChange={handleChange} />
        ))}

        {openedWith && (
          <p className="form__notice" role="status">
            <strong>{openedWith}</strong> should now be open with your message ready to send. If nothing
            opened,{' '}
            <button type="button" className="form__notice-link" onClick={openChooser}>
              choose another way to send
            </button>.
          </p>
        )}

        <button type="submit" className="btn btn--brand form__submit">
          Send message
        </button>
      </motion.form>

      {draft && (
        <EmailChooser
          open={chooserOpen}
          onClose={() => setChooserOpen(false)}
          onSelect={setOpenedWith}
          to={draft.to}
          subject={draft.subject}
          body={draft.body}
          title="How would you like to send this?"
          description={`Pick your email service and we will open a pre-filled message addressed to ${draft.to}.`}
        />
      )}
    </>
  );
}
