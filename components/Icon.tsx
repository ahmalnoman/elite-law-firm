type IconName = 'briefcase' | 'scale' | 'heart' | 'building' | 'shield' | 'globe' | 'phone' | 'whatsapp' | 'mail' | 'pin' | 'clock' | 'arrow' | 'check' | 'menu' | 'close';

const paths: Record<IconName, string> = {
  briefcase:
    'M9 7V5a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2m-12 0h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm0 5h18',
  scale:
    'M12 3v18M6 21h12M7 7h10M5 7l-3 7a4 4 0 0 0 8 0L7 7Zm12 0-3 7a4 4 0 0 0 8 0l-3-7Z',
  heart:
    'M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.65-9.5 9-9.5 9Z',
  building:
    'M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M3 21h18M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01M10 21v-4h4v4',
  shield:
    'M12 3 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-3Zm-3 9 2 2 4-4',
  globe:
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0 0c2.8-2.4 4-6 4-10S14.8 4.4 12 2m0 20c-2.8-2.4-4-6-4-10s1.2-7.6 4-10M2 12h20',
  phone:
    'M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z',
  whatsapp:
    'M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 21l2.1-4.8A8.5 8.5 0 1 1 20.5 11.5Zm-11.4-2c-.2 0-.5.1-.7.3-.3.3-.7.7-.7 1.7s.8 2 .9 2.1c.1.2 1.4 2.2 3.4 3 .8.3 1.4.5 1.9.4.5-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1l-.6-.3c-.3-.1-1-.5-1.2-.6-.2-.1-.3 0-.5.2l-.5.6c-.1.1-.2.1-.4 0-.6-.2-1.1-.5-1.6-1.1-.4-.4-.7-.9-.8-1.1-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.4 0-.1 0-.3 0-.4l-.6-1.4c-.1-.4-.3-.4-.5-.4Z',
  mail:
    'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2 8 7 8-7',
  pin:
    'M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  clock:
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-15v5l3 2',
  arrow:
    'M5 12h14m-6-7 7 7-7 7',
  check:
    'M5 12l5 5L20 7',
  menu:
    'M4 7h16M4 12h16M4 17h16',
  close:
    'M6 6l12 12M18 6 6 18',
};

export default function Icon({
  name,
  className = '',
  strokeWidth = 1.5,
  size = 24,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
