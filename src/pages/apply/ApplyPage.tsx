import { FormEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { createApplication } from '../../features/applications/applicationApi';
import {
  ApplicationCreateRequest,
  ApplicationType,
} from '../../features/applications/applicationTypes';
import { useAuth } from '../../features/auth/useAuth';

type ApplicationForm = Omit<ApplicationCreateRequest, 'type'>;

type ErrorResponse = {
  message?: string;
};

type FieldProps = {
  id: keyof ApplicationForm;
  label: string;
  type?: string;
  value: string;
  onChange: (field: keyof ApplicationForm, value: string) => void;
  required?: boolean;
  placeholder?: string;
};

const emptyForm: ApplicationForm = {
  businessName: '',
  applicantName: '',
  applicantSurname: '',
  email: '',
  phone: '',
  message: '',
};

const applicationOptions: Array<{
  type: ApplicationType;
  title: string;
  description: string;
  eyebrow: string;
}> = [
  {
    type: 'RESTAURANT',
    title: 'Partner with us',
    eyebrow: 'For restaurants',
    description:
      'Reach more customers and manage your menu from your own restaurant dashboard.',
  },
  {
    type: 'COURIER',
    title: 'Deliver with us',
    eyebrow: 'For couriers',
    description:
      'Choose flexible work and help customers receive their orders faster.',
  },
];

function TextField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = true,
  placeholder,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(id, event.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      />
    </div>
  );
}

export function ApplyPage() {
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState<ApplicationType | null>(null);
  const [form, setForm] = useState<ApplicationForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function selectApplicationType(type: ApplicationType) {
    setSelectedType(type);
    setSuccessMessage('');
    setErrorMessage('');
    setForm({
      businessName: '',
      applicantName: user?.firstName ?? '',
      applicantSurname: user?.lastName ?? '',
      email: user?.email ?? '',
      phone: '',
      message: '',
    });
  }

  function updateField(field: keyof ApplicationForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function goBackToSelection() {
    setSelectedType(null);
    setSuccessMessage('');
    setErrorMessage('');
    setForm(emptyForm);
  }

  function getErrorMessage(error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 409) {
      const backendMessage = (error.response.data as ErrorResponse | undefined)
        ?.message;

      return backendMessage
        ? `You already have an application for this role. ${backendMessage}`
        : 'You already have an application for this role.';
    }

    return 'Application could not be submitted. Please try again.';
  }

  function buildRequest(): ApplicationCreateRequest | null {
    if (!selectedType) {
      return null;
    }

    const request: ApplicationCreateRequest = {
      type: selectedType,
      applicantName: form.applicantName.trim(),
      applicantSurname: form.applicantSurname.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    };

    if (selectedType === 'RESTAURANT') {
      request.businessName = form.businessName?.trim();
    }

    const requiredValues = [
      request.applicantName,
      request.applicantSurname,
      request.email,
      request.phone,
      request.message,
    ];

    if (selectedType === 'RESTAURANT') {
      requiredValues.push(request.businessName ?? '');
    }

    return requiredValues.every(Boolean) ? request : null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const request = buildRequest();

    if (!request) {
      setSuccessMessage('');
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await createApplication(request);
      setSuccessMessage(
        'Your application has been submitted successfully. We will review it soon.',
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  const formTitle =
    selectedType === 'RESTAURANT'
      ? 'Restaurant partner application'
      : 'Courier application';

  const formIntro =
    selectedType === 'RESTAURANT'
      ? 'Tell us about your restaurant and the person we should contact.'
      : 'Share your contact details and why you would like to deliver with us.';

  if (!selectedType) {
    return (
      <section className="space-y-8">
        <div className="grid overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
          <div className="px-6 py-10 sm:px-10 lg:py-14">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Delivery partnerships
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold text-slate-950 sm:text-5xl">
              Ready to become our partner?
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Grow your business or start earning with flexible delivery
              opportunities.
            </p>
          </div>

          <div className="relative min-h-64 bg-slate-950 p-6 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.35),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(20,83,45,0.88))]" />
            <div className="relative flex h-full min-h-52 flex-col justify-between rounded-lg border border-white/15 bg-white/10 p-5">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400 text-2xl font-semibold text-slate-950">
                  ✓
                </div>
                <p className="mt-5 text-sm font-medium text-emerald-100">
                  Simple onboarding
                </p>
                <p className="mt-2 max-w-xs text-2xl font-semibold">
                  One application connects you to delivery growth.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs text-emerald-50">
                <span className="rounded-md bg-white/10 px-2 py-2">Menu</span>
                <span className="rounded-md bg-white/10 px-2 py-2">Orders</span>
                <span className="rounded-md bg-white/10 px-2 py-2">Routes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {applicationOptions.map((option) => (
            <button
              key={option.type}
              type="button"
              onClick={() => selectApplicationType(option.type)}
              className="group rounded-lg border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                {option.eyebrow}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-slate-950">
                {option.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {option.description}
              </p>
              <span className="mt-5 inline-flex text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                Start application
              </span>
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={goBackToSelection}
        className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
      >
        Back to application types
      </button>

      <div className="grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="bg-slate-950 p-6 text-white sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            {selectedType === 'RESTAURANT'
              ? 'Partner with us'
              : 'Deliver with us'}
          </p>
          <h1 className="mt-4 text-3xl font-semibold">{formTitle}</h1>
          <p className="mt-4 leading-7 text-slate-300">{formIntro}</p>
          <div className="mt-8 rounded-lg border border-white/10 bg-white/10 p-5">
            <p className="text-sm font-medium text-emerald-100">
              What happens next?
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              We review your details, confirm eligibility, and contact you with
              the next setup steps.
            </p>
          </div>
        </aside>

        <form className="space-y-5 p-6 sm:p-8" onSubmit={handleSubmit}>
          {selectedType === 'RESTAURANT' && (
            <TextField
              id="businessName"
              label="Business name"
              value={form.businessName ?? ''}
              onChange={updateField}
              placeholder="Pizza House"
            />
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              id="applicantName"
              label="First name"
              value={form.applicantName}
              onChange={updateField}
              placeholder="Yekin"
            />

            <TextField
              id="applicantSurname"
              label="Last name"
              value={form.applicantSurname}
              onChange={updateField}
              placeholder="Zulfikari"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={updateField}
              placeholder="test@test.com"
            />

            <TextField
              id="phone"
              label="Phone"
              value={form.phone}
              onChange={updateField}
              placeholder="+430000000"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-700"
            >
              Message
            </label>
            <textarea
              id="message"
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
              required
              rows={5}
              placeholder={
                selectedType === 'RESTAURANT'
                  ? 'I want to become a restaurant partner.'
                  : 'I want to become a courier.'
              }
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {successMessage && (
            <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              {successMessage}
            </p>
          )}

          {errorMessage && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-white"
            >
              {isLoading ? 'Submitting...' : 'Submit application'}
            </button>
            <button
              type="button"
              onClick={goBackToSelection}
              className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
