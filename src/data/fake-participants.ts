import { fakerPT_BR as faker} from '@faker-js/faker'

export type TParticipant = {
    id: string,
    name: string,
    email: string,
    subscribedAt: Date,
    checkInAt: Date
}

export const participants : TParticipant[] = Array.from({ length: 200 }).map(() => ({
    id: faker.string.nanoid(),
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName(),
    subscribedAt: faker.date.recent(),
    checkInAt: faker.date.soon(),
}))