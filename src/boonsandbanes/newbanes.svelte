<script>
import { Button, Col, Row} from "sveltestrap";
import { boonList } from "./boonlist.js";
import { character } from "../stores.js"

export let addNewBoon;
let boons = boonList;
let searchString = '';

function addBoon(boon) {
  let obj = {
    name: boon.name,
    level: 1
  };
  $character.boonsAndBanes.push(obj);
  $character = $character;
  addNewBoon = false;
}
</script>

<Row>
<Col>
<input type='text' bind:value={searchString}/>
</Col>
<Col>
<Button on:click={()=> { addNewBoon = false;}}>Cancel</Button>
</Col>
</Row>
{#each boonList.filter( boon => boon.name.toLowerCase().indexOf(searchString) != -1) as boon}
<Row>
  <div class="col-sm-2">
    <p><strong>{boon.name}</strong> ({#each boon.cost as level, i}{level}{#if i < boon.cost.length - 1}/{/if}{/each})</p>
  </div>
  <Col>
    <p>{boon.description[0]}</p>
  </Col>
  <Col>
    <Button on:click={addBoon(boon)}>Add</Button>
  </Col>
</Row>
{#if boon.cost.length > 1}
<Row>
{#each boon.cost as rank, i}
{#if boon.cost.length > 1}
<Col>
<p><strong>{boon.cost[i]}:</strong> {boon.description[i + 1]} </p>
</Col>
{/if}
{/each}
</Row>
{/if}
{/each}
