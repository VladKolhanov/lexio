import type { UseFormReturn } from 'react-hook-form'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/ui/components/atoms/alert'
import { ShieldXIcon } from '@/ui/icons'
import { cn } from '@/utils/cn'

type Props = {
  error: UseFormReturn['formState']['errors']['root'] | null
  description?: Record<string, string | string[]>
  className?: string
}

export const FormRootError = ({ error, description, className }: Props) => {
  if (!error) return null

  return (
    <Alert
      variant="destructive"
      className={cn(
        'animate-in duration-300 ease-out fade-in-0 slide-in-from-top-2',
        'border-destructive/30 bg-destructive/5',
        'px-4 py-3',
        className
      )}
    >
      <ShieldXIcon className="size-5 shrink-0 text-destructive" />

      <AlertTitle className="leading-snug font-semibold">
        {error.message}
      </AlertTitle>

      {!!description && (
        <AlertDescription className="col-start-2 mt-1">
          <div className="space-y-1">
            {Object.entries(description).map(([key, value], i) => (
              <div key={i}>
                {Array.isArray(value) ? (
                  <div>
                    <p className="font-medium capitalize">{key}:</p>
                    <ul className="list-inside list-disc pl-4">
                      {value.map((error, idx) => (
                        <li key={idx} className="text-sm leading-relaxed">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{value}</p>
                )}
              </div>
            ))}
          </div>
        </AlertDescription>
      )}
    </Alert>
  )
}
