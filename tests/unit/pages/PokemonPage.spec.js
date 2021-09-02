import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from '../mocks/pokemons.mock'
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'



describe('PokemonPage component', () => {
    
    let wrapper 
    
    beforeEach(() => {
        wrapper = shallowMount( PokemonPage )
    })
    
    test('debe de llamar el mixedPokemonArr al montar', () => {
        const mixedPokemonArrSpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray' )
        shallowMount(PokemonPage)
        
        expect( mixedPokemonArrSpy ).toHaveBeenCalled()
    })

    test('debe hacer match con el snapshot cuando se cargan los pokemons', () => {
        
        // console.log(pokemons)
        const wrapper = shallowMount( PokemonPage, {
            data(){
                return {
                    pokemonsArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('debe mostrar los componentes de pokemonPicture y pokemonOptions', () => {    
        
        const wrapper = shallowMount( PokemonPage, {
            data(){
                return {
                    pokemonsArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')
        // PokemonPicture debe existir
        expect(picture.exists()).toBeTruthy();
        // // PokemonOptions debe existir
        expect(options.exists()).toBeTruthy();

        // PokemonPicture attributte === 1
        expect(picture.attributes().pokemonid).toBe('1')
        // PokemonOptions attribute pokemons to be True
        expect(options.attributes('pokemons')).toBeTruthy()
    })

    test('pruebas con checkaAnswer', async() => {
        const wrapper = shallowMount( PokemonPage, {
            data(){
                return {
                    pokemonsArr: pokemons,
                    pokemon: pokemons[1],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(2)
        
        expect( wrapper.find('h2').exists() ).toBeTruthy()
        expect( wrapper.vm.showPokemon ).toBeTruthy()
        expect( wrapper.find('h2').text() ).toBe(`Correcto, ${pokemons[1].name}`)

        await wrapper.vm.checkAnswer(5)
        
        expect(wrapper.vm.message).toBe(`Oops era, ${pokemons[1].name}`)


    })
})