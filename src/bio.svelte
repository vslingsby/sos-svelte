<script>
import { Button, Col, Row } from "sveltestrap";
import { character } from "./stores.js";

let bio = {

}
let name = '';
let lefthanded = false;
let genders = ["Male","Female"]

$: {
  $character.name = name;
  $character.bio = bio;
}
</script>
<h2>Bio</h2>
<p>Name: <input bind:value={name}/></p>
<p>Title: <input bind:value={bio.title}/></p>
<p>Nickname: <input bind:value={bio.nickname}/></p>
<p>Faction/Association: <input bind:value={bio.faction}/></p>
<p>Gender:
<select bind:value={bio.gender}>
  {#each genders as gender}
    <option value={gender}>{gender}</option>
  {/each}
</select>
</p>
<p>Left-handed?: <input type="checkbox" bind:value={lefthanded} /></p>
