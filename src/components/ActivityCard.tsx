import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { MaterialSummary } from '../types/material'
import { IllustrationContainer } from './IllustrationContainer'

export function ActivityCard({ material }: { material: MaterialSummary }) {
  return <Link to={`/materials/${material.id}`} className={`activity-card pressable theme-${material.theme}`} aria-labelledby={`title-${material.id}`}>
    <IllustrationContainer src={material.image} alt={material.imageAlt} eager />
    <div className="activity-card-label"><h2 id={`title-${material.id}`}>{material.title}</h2><span className="round-arrow"><ArrowUpRight size={22} aria-hidden="true" /></span></div>
  </Link>
}
