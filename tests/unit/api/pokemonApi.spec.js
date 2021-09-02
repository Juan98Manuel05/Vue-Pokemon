import pokemonApi from '@/api/pokemonApi'

describe('pokemon API', () => {
    test('axios debe estar configurado correctamente', () => {
        const END_POINTH = 'https://pokeapi.co/api/v2/pokemon'
        expect( pokemonApi.defaults.baseURL )
            .toBe( END_POINTH )
    })
})