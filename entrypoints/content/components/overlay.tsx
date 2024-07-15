import { ReactNode } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import icon from '@/assets/icon.svg'

export const Overlay = (props: {
  rects: DOMRect[]
  children: ReactNode
}) => {
  const lastRect = props.rects.findLast(rect => rect.width > 0)
  if (typeof lastRect === 'undefined') {
    return
  }

  return (
    <>
      {props.rects.map(rect => (
        <div className="bg-[#ff0]/50 absolute pointer-events-none" style={{
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        }} key={JSON.stringify(rect)} />
      ))}
      <div className="absolute z-40" style={{
        left: lastRect.right,
        top: lastRect.top,
      }} >
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <div className='drop-shadow-md'>
              <div className='p-[4px] bg-white' style={{
                clipPath: 'circle(50%)'
              }}>
                <img width={16} height={16} src={icon} alt='answer panel icon' />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-fit'>
            {props.children}
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
