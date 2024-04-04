import { fakerPT_BR as faker} from '@faker-js/faker'

export type TParticipant = {
    id: string,
    name: string,
    email: string,
    subscribedAt: Date,
    checkInAt?: Date
}

const ALL_PARTICIPANTS : TParticipant[] = Array.from({ length: 6 }).map((_, i) => ({
    id: faker.string.nanoid(),
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName(),
    subscribedAt: faker.date.recent(),
    checkInAt: i % 2 == 0 ? faker.date.soon() : undefined,
}))

interface IFetchParticipantsOptions {
    page: number
    search?: string
    limit?: number,
    delay?: number
}
interface IFetchParticipantsReturn {
    total: number
    participants: TParticipant[]
}
export const fetchParticipants = ({ page = 1, search, limit = 10, delay = 3000 } : IFetchParticipantsOptions) : Promise<IFetchParticipantsReturn> => {
    return new Promise(resolve => setTimeout(() => {
        const withSearch = ALL_PARTICIPANTS
                            .filter(participant => (search && search.length > 0) ? participant.name.includes(search) : true)
        resolve({
            total: withSearch.length,
            participants: withSearch.slice(((page - 1) * limit), page * limit)
        })
    }, delay))
}