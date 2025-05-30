import { newE2EPage } from '@stencil/core/testing';

describe('andel-project-q-detail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<andel-project-q-detail></andel-project-q-detail>');

    const element = await page.find('andel-project-q-detail');
    expect(element).toHaveClass('hydrated');
  });
});
