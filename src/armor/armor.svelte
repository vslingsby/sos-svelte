<script>
import { armorList } from './armorlist.js'
import { Button, Col, Row } from "sveltestrap";

</script>

{#each armorList as armor}
<Row>
  <Col>
  <p>{armor.name}</p>
  </Col>
  <Col>
  <p>AV (C/P/B): {armor.avc}/{armor.avp}/{armor.avb}</p>
  </Col>
  <Col>
  <p>{JSON.stringify(armor.coverage)}</p>
  </Col>
</Row>
{/each}
