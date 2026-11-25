import type { FormEvent } from "react"

export function ContactForm() {
  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent(
      `Project enquiry from ${form.get("name")} — ${form.get("company")}`,
    )
    const body = encodeURIComponent(
      [
        `Name: ${form.get("name")}`,
        `Brand / Company: ${form.get("company")}`,
        `Mobile: ${form.get("mobile")}`,
        `Email: ${form.get("email")}`,
        `Project type: ${form.get("type")}`,
        "",
        form.get("message"),
      ].join("\n"),
    )
    window.location.href = `mailto:hello@echoa.in?subject=${subject}&body=${body}`
  }

  return (
    <form id="contact-form" onSubmit={submitContact}>
      <input name="name" placeholder="Name*" aria-label="Name" required />
      <input
        name="company"
        placeholder="Brand / Company*"
        aria-label="Brand or company"
        required
      />
      <input
        name="mobile"
        placeholder="Mobile number*"
        aria-label="Mobile number"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        aria-label="Email"
      />
      <textarea
        name="message"
        placeholder="Message"
        aria-label="Message"
        rows={1}
      />
      <select name="type" aria-label="Project type" defaultValue="" required>
        <option value="" disabled>
          Project Type*
        </option>
        <option>Content Planning</option>
        <option>Creative Direction</option>
        <option>Content Production</option>
        <option>Content Execution</option>
      </select>
      <p>Submitting opens a pre-filled email. No information is stored.</p>
    </form>
  )
}
