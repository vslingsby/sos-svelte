<script>
import { Button, Col, Row } from 'sveltestrap';

export let usedPCP = 0;
let visible = false;
</script>
<Row>
  <Col>
    <h2>Magic</h2>
  </Col>
  <Col>
    <h4>{usedPCP} PCP</h4>
  </Col>
  <Col>
    <Button
      on:click={() => {
        visible = !visible;
      }}>
      {#if visible}
        <p>Hide</p>
      {:else}
        <p>Show</p>
      {/if}
    </Button>
  </Col>
</Row>
{#if visible}
  <Row>
  <Col>
    <p>Used Points: {usedPCP}</p>
  </Col>
  </Row>
  <Row>
      <Col>
        <p>Magic</p>
        <p>
          <input type="number" bind:value={usedPCP} min="0" max="10" />
        </p>
      </Col>
  </Row>
{/if}
