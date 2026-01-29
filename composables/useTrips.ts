export interface Activity {
  id: string
  time: string
  description: string
  type: 'travel' | 'attraction' | 'meal' | 'rest'
}

export interface Restaurant {
  name: string
  description?: string
}

export interface Day {
  date: string
  dayOfWeek: string
  title: string
  activities: Activity[]
  restaurant?: Restaurant
  image: string
  tags: string[]
  city: string
}

export interface Trip {
  slug: string
  title: string
  period: string
  cities: string[]
  image: string
  highlights: string[]
  days: Day[]
}

export function useTrips() {
  const trips: Trip[] = [
    {
      slug: 'maceio-joao-pessoa',
      title: 'Maceió & João Pessoa',
      period: '10 a 18 de fevereiro',
      cities: ['Maceió', 'João Pessoa'],
      image: '/images/maceio-cover.webp',
      highlights: [
        'Pratagy Acqua Park',
        'Praia do Francês',
        'Areia Vermelha',
        'Parque Arruda Câmara'
      ],
      days: [
        {
          date: '2025-02-10',
          dayOfWeek: 'Terça',
          title: 'Chegada',
          city: 'Maceió',
          image: '/images/pajuçara.webp',
          tags: ['chegada', 'adaptação'],
          activities: [
            {
              id: 'mcz-10-arrival',
              time: 'Manhã/Tarde',
              description: 'Viagem de carro + check-in',
              type: 'travel'
            },
            {
              id: 'mcz-10-walk',
              time: 'Final de tarde',
              description: 'Caminhada curta na orla de Pajuçara',
              type: 'attraction'
            },
            {
              id: 'mcz-10-snack',
              time: 'Final de tarde',
              description: 'Sorvete / água de coco',
              type: 'meal'
            },
            {
              id: 'mcz-10-dinner',
              time: 'Noite',
              description: 'Jantar: Divina Gula',
              type: 'meal'
            }
          ],
          restaurant: {
            name: 'Divina Gula',
            description: 'Jantar'
          }
        },
        {
          date: '2025-02-11',
          dayOfWeek: 'Quarta',
          title: 'Pratagy Acqua Park (Dia 1)',
          city: 'Maceió',
          image: '/images/pratagy.jpg',
          tags: ['parque aquático', 'dia inteiro', 'família'],
          activities: [
            {
              id: 'mcz-11-park',
              time: 'Dia inteiro',
              description: 'Pratagy Acqua Park',
              type: 'attraction'
            },
            {
              id: 'mcz-11-lunch',
              time: 'Almoço',
              description: 'Almoço no parque',
              type: 'meal'
            },
            {
              id: 'mcz-11-return',
              time: 'Meio da tarde',
              description: 'Volta ao hotel',
              type: 'rest'
            },
            {
              id: 'mcz-11-dinner',
              time: 'Noite',
              description: 'Lanche leve ou pedir no hotel',
              type: 'meal'
            }
          ]
        },
        {
          date: '2025-02-12',
          dayOfWeek: 'Quinta',
          title: 'Pratagy (Dia 2) OU Praia do Francês',
          city: 'Maceió',
          image: '/images/praia-frances.jpg',
          tags: ['opção', 'praia', 'parque aquático'],
          activities: [
            {
              id: 'mcz-12-option-a',
              time: 'Opção A',
              description: 'Pratagy Acqua Park (repetir)',
              type: 'attraction'
            },
            {
              id: 'mcz-12-option-b-arrival',
              time: 'Opção B - Manhã',
              description: 'Chegar cedo na Praia do Francês',
              type: 'attraction'
            },
            {
              id: 'mcz-12-option-b-beach',
              time: 'Até ~11h',
              description: 'Praia do Francês',
              type: 'attraction'
            },
            {
              id: 'mcz-12-lunch',
              time: 'Almoço',
              description: 'Massagueirinha',
              type: 'meal'
            },
            {
              id: 'mcz-12-rest',
              time: 'Tarde',
              description: 'Tarde de descanso',
              type: 'rest'
            }
          ],
          restaurant: {
            name: 'Massagueirinha',
            description: 'Almoço (se escolher Praia do Francês)'
          }
        },
        {
          date: '2025-02-13',
          dayOfWeek: 'Sexta',
          title: 'Maceió → João Pessoa',
          city: 'Viagem',
          image: '/images/joao-pessoa-cover.webp',
          tags: ['viagem', 'mudança de cidade'],
          activities: [
            {
              id: 'travel-13-departure',
              time: 'Manhã',
              description: 'Saída cedo de Maceió',
              type: 'travel'
            },
            {
              id: 'travel-13-stops',
              time: 'Durante a viagem',
              description: 'Paradas estratégicas',
              type: 'travel'
            },
            {
              id: 'travel-13-checkin',
              time: 'Tarde',
              description: 'Check-in em João Pessoa',
              type: 'travel'
            },
            {
              id: 'jp-13-dinner',
              time: 'Noite',
              description: 'Jantar: Mangai (se ainda tiver energia)',
              type: 'meal'
            }
          ],
          restaurant: {
            name: 'Mangai',
            description: 'Jantar (opcional)'
          }
        },
        {
          date: '2025-02-14',
          dayOfWeek: 'Sábado',
          title: 'Praia urbana',
          city: 'João Pessoa',
          image: '/images/praia-tambau.jpeg',
          tags: ['praia', 'urbana', 'família'],
          activities: [
            {
              id: 'jp-14-beach',
              time: 'Manhã',
              description: 'Praia de Tambaú - estrutura, sombra, fácil com crianças',
              type: 'attraction'
            },
            {
              id: 'jp-14-lunch',
              time: 'Almoço',
              description: 'Nau Frutos do Mar',
              type: 'meal'
            },
            {
              id: 'jp-14-rest',
              time: 'Tarde',
              description: 'Tarde livre / descanso',
              type: 'rest'
            }
          ],
          restaurant: {
            name: 'Nau Frutos do Mar',
            description: 'Almoço'
          }
        },
        {
          date: '2025-02-15',
          dayOfWeek: 'Domingo',
          title: 'Areia Vermelha',
          city: 'João Pessoa',
          image: '/images/Areia-Vermelha.01.jpg',
          tags: ['passeio de barco', 'maré baixa', 'família'],
          activities: [
            {
              id: 'jp-15-departure',
              time: 'Manhã cedo',
              description: 'Saída cedo (maré baixa)',
              type: 'travel'
            },
            {
              id: 'jp-15-boat',
              time: 'Manhã',
              description: 'Passeio de barco curto para Areia Vermelha',
              type: 'attraction'
            },
            {
              id: 'jp-15-beach',
              time: 'Manhã',
              description: 'Água rasa, ótimo para crianças',
              type: 'attraction'
            },
            {
              id: 'jp-15-return',
              time: 'Até 11h',
              description: 'Retorno',
              type: 'travel'
            },
            {
              id: 'jp-15-lunch',
              time: 'Almoço',
              description: 'Camarão Grill',
              type: 'meal'
            },
            {
              id: 'jp-15-rest',
              time: 'Tarde',
              description: 'Tarde totalmente livre',
              type: 'rest'
            }
          ],
          restaurant: {
            name: 'Camarão Grill',
            description: 'Almoço'
          }
        },
        {
          date: '2025-02-16',
          dayOfWeek: 'Segunda',
          title: 'Parque + descanso',
          city: 'João Pessoa',
          image: '/images/joao-pessoa-cover.webp',
          tags: ['parque', 'animais', 'família'],
          activities: [
            {
              id: 'jp-16-park',
              time: 'Manhã',
              description: 'Parque Arruda Câmara (Bica) - animais + sombra + caminhada leve',
              type: 'attraction'
            },
            {
              id: 'jp-16-lunch',
              time: 'Almoço',
              description: 'Mangai (vale repetir)',
              type: 'meal'
            },
            {
              id: 'jp-16-rest',
              time: 'Tarde',
              description: 'Tarde no hotel',
              type: 'rest'
            }
          ],
          restaurant: {
            name: 'Mangai',
            description: 'Almoço'
          }
        },
        {
          date: '2025-02-17',
          dayOfWeek: 'Terça',
          title: 'Piscinas do Seixas',
          city: 'João Pessoa',
          image: '/images/seixas.jpg',
          tags: ['piscinas naturais', 'peixinhos', 'família'],
          activities: [
            {
              id: 'jp-17-departure',
              time: 'Manhã cedo',
              description: 'Saída cedo',
              type: 'travel'
            },
            {
              id: 'jp-17-pools',
              time: 'Manhã',
              description: 'Piscinas do Seixas - passeio mais curto que Areia Vermelha, bom para 6 e 10 anos (peixinhos)',
              type: 'attraction'
            },
            {
              id: 'jp-17-return',
              time: '~10h',
              description: 'Volta por volta das 10h',
              type: 'travel'
            },
            {
              id: 'jp-17-lunch',
              time: 'Almoço',
              description: 'Perto do hotel',
              type: 'meal'
            },
            {
              id: 'jp-17-packing',
              time: 'Tarde',
              description: 'Arrumar malas com calma',
              type: 'rest'
            }
          ]
        },
        {
          date: '2025-02-18',
          dayOfWeek: 'Quarta',
          title: 'Retorno',
          city: 'Viagem',
          image: '/images/maceio-cover.webp',
          tags: ['retorno', 'viagem'],
          activities: [
            {
              id: 'travel-18-checkout',
              time: 'Manhã',
              description: 'Check-out',
              type: 'travel'
            },
            {
              id: 'travel-18-return',
              time: 'Dia',
              description: 'Viagem de retorno',
              type: 'travel'
            }
          ]
        }
      ]
    }
  ]

  const getTripBySlug = (slug: string): Trip | undefined => {
    return trips.find(trip => trip.slug === slug)
  }

  return {
    trips,
    getTripBySlug
  }
}
