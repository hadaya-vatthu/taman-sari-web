<div class="container">
	<h1 id="error-code">501</h1>
	<div id="error-message">Not Implemented</div>
	<pre id="error-reason"><slot /></pre>
</div>

<style type="text/css">
	* {
		font-family: 'Roboto', sans-serif;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30vh;
	}
	#error-code {
		font-size: 5em;
		line-height: 2px;
	}
	#error-message {
		font-size: 1.2em;
		font-weight: bold;
		margin-bottom: 0.4em;
	}
	pre {
		font-family: 'Courier New', Courier, monospace;
		font-size: 1em;
	}
</style>
