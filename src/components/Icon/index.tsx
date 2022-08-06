import classNames from 'classnames'
// the type of the component props
type Props = {
  // icon type
  type: string
  // icon's custom style
  className?: string
  // click event
  onClick?: () => void
}
const Icon = ({ type, className, onClick }: Props) => {
  return (
    <svg
      className={classNames('icon', className)}
      aria-hidden="true"
      onClick={onClick}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  )
}
export default Icon
