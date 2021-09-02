import getPokemonsOptions, { getPokemons, getPokemonNames }  from '@/helpers/getPokemonOptions'

describe('getPokemonOptions helpers' ,() => {

    test('Debe regresar un arreglo de numeros', () => {
        const pokemons = getPokemons()
        expect( pokemons.length ).toBe(650)        
    })

    test('debe de retonar un arreglo de 4 elementos con sus nombres de pokemons', async() => {
        
        const pokemons = await getPokemonNames([1,2,3,4])
        const pokemons2 = [
            { name: 'bulbasaur', id: 1 },
            { name: 'ivysaur', id: 2 },
            { name: 'venusaur', id: 3 },
            { name: 'charmander', id: 4 }
          ]

        expect( pokemons ).toEqual( pokemons2 )
        expect( pokemons ).toStrictEqual( pokemons2 )
    })

    test('getPokemonOptiosn  debe de retonar un arreglo mezclado', async() => {    
        const pokemons = await getPokemonsOptions()
        const pokemons2 = [
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number)  
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number)  
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
             }
        ]
        
        expect( pokemons.length ).toBe(4)
        expect( pokemons ).toEqual( pokemons2 )

    })
})