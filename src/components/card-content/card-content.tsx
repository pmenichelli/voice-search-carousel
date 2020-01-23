import { h, Component } from '@stencil/core';

@Component({
	shadow: true,
	styleUrl: './card-content.scss',
	tag: 'dt-card-content',
})
export class DottCardContent {
	protected render(): unknown {
		return (
			<div class='dt-card-content'>
				<slot />
			</div>
		);
	}
}
