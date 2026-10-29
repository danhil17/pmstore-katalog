import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/** Original decorative device illustration; not a photograph of a listed unit. */
function DeviceDisplay() {
  return (
    <svg viewBox="0 0 900 370" className="mx-auto h-auto w-full max-w-[850px]" role="img" aria-label="Ilustrasi perangkat gadget, bukan foto unit yang dijual">
      <defs>
        <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#bdd3ee" /><stop offset="1" stopColor="#426795" /></linearGradient>
        <linearGradient id="metal" x1="0" x2="1"><stop stopColor="#a0aab5" /><stop offset=".5" stopColor="#e2e8ed" /><stop offset="1" stopColor="#8f9ba7" /></linearGradient>
        <linearGradient id="phone" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8cabc4" /><stop offset="1" stopColor="#bfd0de" /></linearGradient>
      </defs>
      <ellipse cx="455" cy="338" rx="350" ry="14" fill="#1a283c" opacity=".07" />
      <g transform="translate(80 67) rotate(-6 180 120)">
        <rect width="368" height="245" rx="15" fill="url(#metal)" />
        <rect x="6" y="6" width="356" height="229" rx="11" fill="#18202b" />
        <rect x="14" y="14" width="340" height="213" rx="5" fill="url(#screen)" />
        <path d="M14 192 Q90 60 190 142 T354 80 V227 H14Z" fill="#e7edf7" opacity=".55" />
        <path d="M14 218 Q130 120 234 184 T354 150 V227 H14Z" fill="#314968" opacity=".5" />
        <path d="M-25 245 H393 L414 258 Q417 266 401 266 H-34 Q-47 264-43 258Z" fill="url(#metal)" />
        <path d="M144 245 H224 L217 252 H151Z" fill="#8895a2" />
      </g>
      <g transform="translate(596 67) rotate(9 110 130)">
        <rect width="190" height="259" rx="19" fill="#aeb8c5" />
        <rect x="4" y="4" width="182" height="251" rx="16" fill="#1a2430" />
        <rect x="13" y="14" width="164" height="229" rx="7" fill="#d6c8ba" />
        <path d="M13 155 Q85 22 177 125 V243 H13Z" fill="#a28c7c" />
        <path d="M13 216 Q122 126 177 192 V243 H13Z" fill="#f0e5da" />
      </g>
      <g transform="translate(384 15) rotate(-7 84 157)">
        <rect width="166" height="314" rx="29" fill="#69859d" />
        <rect x="4" y="3" width="158" height="308" rx="26" fill="url(#phone)" stroke="#deebf5" />
        <rect x="15" y="16" width="80" height="91" rx="21" fill="#91aabe" stroke="#7893a8" />
        {[ [37,40], [72,63], [37,85] ].map(([cx,cy]) => <g key={cy}><circle cx={cx} cy={cy} r="16" fill="#687f94" /><circle cx={cx} cy={cy} r="12" fill="#1a2533" /><circle cx={cx-3} cy={cy-3} r="4" fill="#43576e" /></g>)}
        <circle cx="72" cy="32" r="6" fill="#ede8db" />
        <circle cx="72" cy="90" r="5" fill="#627789" />
        <path d="M69 176 H95 M82 163 V189" stroke="#dbe6ed" strokeWidth="2" opacity=".55" />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="overflow-hidden bg-[#f1f3f5] px-4 pt-10 text-center sm:pt-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-muted">Pilihan gadget · PM STORE Lumajang</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-[38px] font-semibold leading-[1.1] tracking-[-.055em] text-ink sm:text-6xl lg:text-[72px]">Gadget pilihan.<br /><span className="text-[#697584]">Untuk keseharianmu.</span></h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted sm:text-base">Temukan gadget yang pas untuk kebutuhanmu.<br className="hidden sm:block" /> Cek detailnya, lalu konsultasikan dengan admin.</p>
        <Link href="#katalog" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition hover:bg-accent-hover">Jelajahi katalog <ArrowUpRight size={16} /></Link>
        <div className="mx-auto mt-7 w-[115%] max-w-none -translate-x-[6.5%] sm:mt-9 sm:w-full sm:translate-x-0"><DeviceDisplay /></div>
      </div>
    </section>
  );
}
