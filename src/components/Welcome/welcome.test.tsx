import WelcomeComponent from '@/components/Welcome'
import { WelcomeText } from '@/constant/text'
import { render, screen } from '@/test-utils'

describe('Welcome component', () => {
  it('renders the title with correct text and styling', () => {
    render(<WelcomeComponent />)

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent(WelcomeText.titleStart)
    expect(title).toHaveTextContent(WelcomeText.titleHighlight)
    expect(title).toHaveTextContent(WelcomeText.titleEnd)

    const titleHighlight = screen.getByText(WelcomeText.titleHighlight)
    expect(titleHighlight).toHaveClass('mantine-Text-root')
    expect(titleHighlight).toHaveStyle({
      backgroundImage: expect.stringContaining('linear-gradient'),
    })
  })

  it('renders the description text', () => {
    render(<WelcomeComponent />)

    const description = screen.getByText(WelcomeText.description)
    expect(description).toBeInTheDocument()
    expect(description).toHaveClass('mantine-Text-root')
  })
})
