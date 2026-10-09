import { ArrowRightIcon, SparkleIcon } from '../../components/ui/icons.tsx'
import { cn } from '../../lib/cn.ts'

interface ChatbotEntryProps {
  /** Opens the chat panel. Required, so the entry can never render without working. */
  onOpen: () => void
  className?: string
}

/**
 * The Hero's focal entry point to the AI chatbot. Rendered only when CHATBOT_ENABLED is on and
 * a real open handler is provided (Step 21).
 */
export function ChatbotEntry({ onOpen, className }: ChatbotEntryProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'group flex w-full max-w-md items-center gap-4 rounded-2xl border border-border bg-surface p-4 text-left shadow-card transition-[border-color,box-shadow,translate] duration-300 ease-smooth hover:border-accent-200 hover:shadow-card-hover motion-safe:hover:-translate-y-0.5',
        className,
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-600 text-white shadow-accent">
        <SparkleIcon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9375rem] font-semibold text-fg">Ask my AI assistant</span>
        <span className="mt-0.5 block text-sm text-fg-muted">
          Questions about my projects, skills and education
        </span>
      </span>
      <ArrowRightIcon className="text-fg-subtle transition-[color,translate] duration-200 ease-smooth group-hover:text-accent-700 motion-safe:group-hover:translate-x-0.5" />
    </button>
  )
}
