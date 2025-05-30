import { newSpecPage } from '@stencil/core/testing';
import { AndelProjectQDetail } from '../andel-project-q-detail';

describe('andel-project-q-detail', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AndelProjectQDetail],
      html: `<andel-project-q-detail></andel-project-q-detail>`,
    });
    expect(page.root).toEqualHtml(`
      <andel-project-q-detail>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </andel-project-q-detail>
    `);
  });
});
