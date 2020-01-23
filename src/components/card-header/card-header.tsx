import { h, Component, Prop } from '@stencil/core';

@Component({
	shadow: true,
	styleUrl: './card-header.scss',
	tag: 'dt-card-header',
})
export class DottCardHeader {
	@Prop() public readonly header: string;

	protected render(): unknown {
		return <div class='dt-card-header'>{this.header}</div>;
	}
}
