import { stats } from '../data/siteContent.js';
import useCountUp from '../hooks/useCountUp.js';
import './StatsBar.css';

function Stat({ value, from, label }) {
  const [ref, current] = useCountUp(value, { from });
  return (
    <li className="stat" ref={ref}>
      <strong className="stat__value">{current}</strong>
      <span className="stat__label">{label}</span>
    </li>
  );
}

export default function StatsBar() {
  return (
    <ul className="wrap stats">
      {stats.map((s) => <Stat key={s.label} {...s} />)}
    </ul>
  );
}
