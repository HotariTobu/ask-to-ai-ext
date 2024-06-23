export const Overlay = (props: {
  rects: DOMRect[]
}) => {
  return <>
    {props.rects.map(rect => (
      <div className="bg-red-500/10 absolute pointer-events-none" style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }} key={JSON.stringify(rect)} />
    ))}
  </>
}
