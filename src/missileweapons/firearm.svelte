<script>
import { Button, Col, Row } from "sveltestrap";
import { firearmsList } from './firearms.js';
import { barrelList } from './firearms.js';
import { ammunitionTypeList } from './firearms.js';
import { projectileList } from './firearms.js';
import { loadingMechanismList } from './firearms.js';
import { firingMechanismList } from './firearms.js';

let sFirearm = {};
let sBarrel = {};
let sAmmunitionType = {};
let sProjectile = {};
let sLoadingMechanism = {};
let sFiringMechanism = {};
let sFirearmValue = 0;
let sBarrelValue = 0;
let sAmmunitionTypeValue = 0;
let sProjectileValue = 0;
let sLoadingMechanismValue = 0;
let sFiringMechanismValue = 0;

$: {
  sFirearm = firearmsList[sFirearmValue];
  sFirearm.modifications.barrel = barrelList[sBarrelValue]
}
</script>
<select bind:value={sFirearmValue}>
{#each firearmsList as firearm, i}
<option value={i}>{firearm.name}</option>
{/each}
</select>

{#if sFirearm}
<p>{sFirearm.name}</p>
  {#if sFirearm.modifications.hasOwnProperty('barrel')}
    <select bind:value={sBarrelValue}>
    {#each barrelList as barrel, i}
      <option value={i}>{barrel.name}</option>
    {/each}
    </select>
  {/if}
  {#if sFirearm.modifications.hasOwnProperty('firing')}
    <select bind:value={sFiringMechanismValue}>
    {#each firingMechanismList as firing, i}
      <option value={i}>{firing.name}</option>
    {/each}
    </select>
  {/if}
{/if}
