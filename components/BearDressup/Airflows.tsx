import { motion } from 'framer-motion'

type AirflowEllipseProps = {
  cx: number
  cy: number
  rx: number
  ry: number
}

const AirflowEllipse = ({ cx, cy, rx, ry }: AirflowEllipseProps) => {
  return (
    <motion.ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill="#474747"
      initial={{ x: 0 }}
      animate={{ x: -15 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear',
      }}
    />
  )
}

const Airflows = () => {
  const ellipses = [
    { cx: 36.1533, cy: 228.57, rx: 18.5, ry: 2 },
    { cx: 30.1533, cy: 240.57, rx: 18.5, ry: 2 },
    { cx: 40.9678, cy: 163.359, rx: 18.5, ry: 2 },
    { cx: 34.9678, cy: 175.359, rx: 18.5, ry: 2 },
  ]

  return (
    <g id="airflow">
      <svg
        width="360"
        height="340"
        viewBox="0 0 360 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {ellipses.map((props, index) => (
          <AirflowEllipse key={index} {...props} />
        ))}
      </svg>
    </g>
  )
}

export default Airflows
