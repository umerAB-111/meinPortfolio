import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [
    {
      id: 1,
      title: 'AI-Powered Analytics Dashboard',
      description: 'Real-time data visualization platform with machine learning predictions',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      category: 'web',
      tags: ['React', 'Python', 'TensorFlow', 'D3.js'],
      link: '#',
      github: '#',
    },
    {
      id: 2,
      title: 'E-Commerce Mobile App',
      description: 'Cross-platform shopping experience with AR product preview',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      category: 'mobile',
      tags: ['React Native', 'Firebase', 'Stripe'],
      link: '#',
      github: '#',
    },
    {
      id: 3,
      title: 'Cloud Infrastructure Automation',
      description: 'Infrastructure-as-code solution for enterprise deployment',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      category: 'devops',
      tags: ['AWS', 'Terraform', 'Kubernetes', 'Docker'],
      link: '#',
      github: '#',
    },
    {
      id: 4,
      title: 'Collaborative Design Tool',
      description: 'Real-time design platform with multiplayer features',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
      category: 'web',
      tags: ['Next.js', 'Socket.io', 'Canvas API'],
      link: '#',
      github: '#',
    },
    {
      id: 5,
      title: 'Fitness Tracking Platform',
      description: 'Wearable data aggregation with personalized insights',
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800',
      category: 'mobile',
      tags: ['Flutter', 'GraphQL', 'HealthKit'],
      link: '#',
      github: '#',
    },
    {
      id: 6,
      title: 'DevOps Pipeline Dashboard',
      description: 'CI/CD monitoring with automated incident response',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      category: 'devops',
      tags: ['Jenkins', 'Prometheus', 'Grafana'],
      link: '#',
      github: '#',
    },
  ],
  filter: 'all',
  selected: null,
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    setSelected: (state, action) => {
      state.selected = action.payload
    },
    addProject: (state, action) => {
      state.items.push(action.payload)
    },
  },
})

export const { setFilter, setSelected, addProject } = projectsSlice.actions

export const selectFilteredProjects = (state) => {
  const { items, filter } = state.projects
  if (filter === 'all') return items
  return items.filter((project) => project.category === filter)
}

export default projectsSlice.reducer