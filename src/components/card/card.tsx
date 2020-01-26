import { h, Component, Prop } from '@stencil/core';

@Component({
	shadow: true,
	styleUrl: './card.scss',
	tag: 'dt-card',
})
export class DottCard {

  @Prop() public header: string;

	protected render(): unknown {
		return (
			<div class='dt-card'>
				<div class='dt-card__header'>{this.header}</div>
        <div class='dt-card__content'>
          <slot />
        </div>
			</div>
		);
	}
}
