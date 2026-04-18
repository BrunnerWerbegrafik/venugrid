/**
 * Minimal footer in the Celonis aesthetic — hairline divider, uppercase
 * eyebrow-sized meta, cyan logo dot, very quiet.
 */
export function Footer() {
  return (
    <footer
      className="border-t hairline"
      style={{ backgroundColor: 'rgba(10,10,10,1)' }}
    >
      <div className="flex flex-col gap-8 px-8 py-14 sm:px-12 md:flex-row md:items-end md:justify-between md:px-16 lg:px-20 xl:px-24">
        <div className="flex flex-col gap-4">
          <span
            className="inline-flex items-center text-[14px]"
            style={{ fontWeight: 500, letterSpacing: '0.28em' }}
          >
            <span>VENU</span>
            <span
              aria-hidden
              className="mx-[0.35em] inline-block h-[6px] w-[6px] rounded-full"
              style={{ backgroundColor: '#1fb3da' }}
            />
            <span>GRID</span>
          </span>
          <p
            className="max-w-[360px] text-[13px] leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}
          >
            Branding-Module für Event-Locations — kuratiert, konfiguriert, angefragt.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 md:items-end">
          <span
            className="text-[10px] uppercase"
            style={{
              letterSpacing: '0.28em',
              color: 'rgba(255,255,255,0.4)',
              fontWeight: 500,
            }}
          >
            Ein Prototyp von
          </span>
          <span
            className="text-[13px]"
            style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}
          >
            Brunner Werbegrafik
          </span>
        </div>
      </div>
    </footer>
  );
}
