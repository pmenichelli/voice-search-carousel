import { h, Component } from '@stencil/core';

@Component({
	shadow: true,
	styleUrl: './book.scss',
	tag: 'dt-book',
})
export class DottBook {
	protected render(): unknown {
		return (
			<div class='dt-book'>
			</div>
		);
	}
}
