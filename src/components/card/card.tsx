import { h, Component } from '@stencil/core';

@Component({
	shadow: true,
	styleUrl: './card.scss',
	tag: 'dt-card',
})
export class DottCard {
	protected render(): unknown {
		return (
			<div class='dt-card'>
				<slot />
			</div>
		);
	}
}
