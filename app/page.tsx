import {readFileSync} from 'fs'
import {parse} from 'papaparse'

const pokemon_file = readFileSync('data/PokeStats.csv')
var pokemon_data = []
var parse_err = null
parse(pokemon_file.toString(), {
  complete: function(results) {
    pokemon_data = results.data
    parse_err = results.errors
  }
})
while (pokemon_data.length == 0 && parse_err == null) {}

function StatBox({stat_name, stat_value}) {
  return(
    <div>
      <div>
        {stat_name}
      </div>
      <div>
        {stat_value}
      </div>
    </div>
  )
}

function StatsBox({ stat_values }) {
  const stat_names = ['HP', 'ATK', 'DEF', 'SP. ATK', 'SP. DEF', 'SPD', 'BST']
  var stats_list = [];
  for (var i = 0; i < stat_values.length; i++) {
    stats_list.push(<StatBox stat_name={stat_names[i]} stat_value={stat_values[i]}/>)
  }
  console.log(stats_list)
  return(
    <div>
      {stats_list}
    </div>
  )
}

export default function Page() {
  const pokemon_idx = Math.floor(Math.random() * (pokemon_data.length-1))
  const chosen_pokemon = pokemon_data[pokemon_idx]
  console.log(chosen_pokemon)
  var pokemon_stats = chosen_pokemon.slice(chosen_pokemon.length-7)
  pokemon_stats = pokemon_stats.slice(1).concat(pokemon_stats[0])
  return (
    <StatsBox stat_values={pokemon_stats}/>
  )
}
