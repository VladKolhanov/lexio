import type { Message } from 'react-hook-form'

import { Alert, AlertTitle } from '@/ui/components/atoms/alert'
import { ShieldXIcon } from '@/ui/icons'
import { cn } from '@/utils/cn'

type Error = Partial<{
  type: string | number
  message: Message
}>

type Props = {
  error: (Record<string, Error> & Error) | undefined
  className?: string
}

// TODO: Refactor component for display many mistakes

export const FormRootError = ({ error, className }: Props) => {
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

      {/* {!!error.details && (
        <AlertDescription className="col-start-2 mt-1">
          <div className="space-y-1">
            {Object.entries(error.details).map(([key, value], i) => (
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
      )} */}
    </Alert>
  )
}
