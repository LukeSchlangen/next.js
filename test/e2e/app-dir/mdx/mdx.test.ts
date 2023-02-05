import { createNextDescribe } from 'e2e-utils'

for (const type of ['with-mdx-rs', 'without-mdx-rs']) {
  createNextDescribe(
    `mdx ${type}`,
    {
      files: __dirname,
      dependencies: {
        '@next/mdx': 'canary',
      },
      env: {
        WITH_MDX_RS: type === 'with-mdx-rs' ? 'true' : 'false',
      },
    },
    ({ next }) => {
      describe('app directory', () => {
        it('should work in initial html', async () => {
          const $ = await next.render$('/')
          expect($('h1').text()).toBe('Hello World')
          expect($('p').text()).toBe('This is MDX!')
        })

        it('should work using browser', async () => {
          const browser = await next.browser('/')
          expect(await browser.elementByCss('h1').text()).toBe('Hello World')
          expect(await browser.elementByCss('p').text()).toBe('This is MDX!')
        })

        it('should work in initial html with mdx import', async () => {
          const $ = await next.render$('/import')
          expect($('h1').text()).toBe('This is a title')
          expect($('p').text()).toBe('This is a paragraph')
        })

        it('should work using browser with mdx import', async () => {
          const browser = await next.browser('/import')
          expect(await browser.elementByCss('h1').text()).toBe(
            'This is a title'
          )
          expect(await browser.elementByCss('p').text()).toBe(
            'This is a paragraph'
          )
        })

        it('should allow overriding components', async () => {
          const browser = await next.browser('/')
          expect(await browser.elementByCss('h1').getComputedCss('color')).toBe(
            'rgb(255, 0, 0)'
          )
        })
      })

      describe('pages directory', () => {
        it('should work in initial html', async () => {
          const $ = await next.render$('/pages')
          expect($('h1').text()).toBe('Hello World')
          expect($('p').text()).toBe('This is MDX!')
        })

        // Recommended for tests that need a full browser
        it('should work using browser', async () => {
          const browser = await next.browser('/pages')
          expect(await browser.elementByCss('h1').text()).toBe('Hello World')
          expect(await browser.elementByCss('p').text()).toBe('This is MDX!')
        })

        it('should work in initial html with mdx import', async () => {
          const $ = await next.render$('/pages/import')
          expect($('h1').text()).toBe('This is a title')
          expect($('p').text()).toBe('This is a paragraph')
        })

        it('should work using browser with mdx import', async () => {
          const browser = await next.browser('/pages/import')
          expect(await browser.elementByCss('h1').text()).toBe(
            'This is a title'
          )
          expect(await browser.elementByCss('p').text()).toBe(
            'This is a paragraph'
          )
        })

        it('should allow overriding components', async () => {
          const browser = await next.browser('/pages')
          expect(await browser.elementByCss('h1').getComputedCss('color')).toBe(
            'rgb(255, 0, 0)'
          )
        })
      })
    }
  )
}
