import { ActivityCard } from '../../components/ActivityCard'
import { PageHeader } from '../../components/PageHeader'
import { materials } from '../../data/materials'

export function MaterialList() {
  return <><PageHeader title="Mau belajar apa?" description="Pilih satu kegiatan, yuk!" backTo="/" />
    <nav aria-label="Pilihan materi" className="activity-grid">{materials.map(material => <ActivityCard key={material.id} material={material} />)}</nav>
  </>
}
