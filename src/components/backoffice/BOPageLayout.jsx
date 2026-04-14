import StudioHeader from '../StudioHeader'

/**
 * Shared layout wrapper for all Backoffice screens.
 * Fluid responsive layout — no ScaledFrame.
 *
 * Props:
 *   title     – header text (shown next to logo)
 *   children  – main content
 *   sidebar   – optional ReactNode (right column)
 *   fullWidth – if true, content spans full width (no sidebar slot)
 */
export default function BOPageLayout({ title = 'Backoffice Studio', children, sidebar, fullWidth = false }) {
  return (
    <div className="h-full overflow-y-auto bg-[#f2f2f5]">
      <StudioHeader name={title} variant="fluid" />
      <div className={`mx-auto px-4 sm:px-6 py-6 flex flex-col xl:flex-row gap-6 ${fullWidth ? 'max-w-[1600px]' : 'max-w-[1400px]'}`}>
        <div className="flex-1 min-w-0">
          {children}
        </div>
        {!fullWidth && sidebar && (
          <div className="w-full xl:w-[340px] xl:shrink-0">
            {sidebar}
          </div>
        )}
      </div>
    </div>
  )
}
