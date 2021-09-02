<template>
    <h1 v-if="!pokemon"> Espere por favor...</h1>
    
    <div v-else-if="pokemon">
        <h1>¿ Quien es este pokémon?</h1>

        <!-- IMG -->
        <PokemonPicture 
            :pokemon-id="pokemon.id" 
            :show-pokemon="showPokemon"/>

        <!-- OPCIONES -->
        <PokemonOptions            
            :pokemons="pokemonsArr" 
            @selection-pokemon="checkAnswer"
            />

        <template v-if="showAnswer">
            <h2 class="fade-in"> {{ message }} </h2>
            <button @click="newGame">
                nuevo juego
            </button>
        </template>
    </div>

</template>

<script>

import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'

import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
    components:{
        PokemonPicture, PokemonOptions
    },
    data(){
        return{
            pokemonsArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods:{
        async mixPokemonArray(){
            this.pokemonsArr = await getPokemonOptions()
            
            const rndInt = Math.floor(Math.random() * 4 )

            this.pokemon = this.pokemonsArr[rndInt]
        },
        checkAnswer( SelectedId ){

            this.showPokemon = true 
            this.showAnswer = true

            if( SelectedId === this.pokemon.id){
                this.message = `Correcto, ${ this.pokemon.name }`
            }else{
                this.message = `Oops era, ${ this.pokemon.name }`
            }

        },
        async newGame(){
            this.showPokemon = false
            this.showAnswer = false
            this.pokemonsArr = []
            this.pokemon =  null
            await this.mixPokemonArray()
        }
    },
    mounted(){       
        this.mixPokemonArray()
    }
}
</script>