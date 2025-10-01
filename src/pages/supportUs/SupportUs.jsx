import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, CompareIcon, ConvertIcon } from '../../components/ui/Icons';
import './SupportUs.css';

const featureHighlights = [
	{
		key: 'clock',
		Icon: ClockIcon,
		title: 'World Clock',
		description:
			'Check the current time anywhere on the planet with analog and digital views, fullscreen mode, and reliable offsets.'
	},
	{
		key: 'compare',
		Icon: CompareIcon,
		title: 'Compare Timezones',
		description:
			'Line up two locations to see their current times side by side, including the exact difference so planning is effortless.'
	},
	{
		key: 'convert',
		Icon: ConvertIcon,
		title: 'Convert a Moment',
		description:
			'Translate any date and time from one timezone to another—daylight savings included—before you send that invite.'
	}
];

const supportIdeas = [
	{
		key: 'share',
		label: 'Share OClock',
		description:
			'Tell teammates, classmates, and friends who work across timezones. A single recommendation keeps us growing without ads.',
		actionLabel: 'Copy site link'
	},
	{
		key: 'feedback',
		label: 'Send feedback',
		description:
			'Share how you use OClock and what would help you next. Real stories steer our roadmap and keep features useful.',
		actionLabel: 'Email feedback'
	},
	{
		key: 'bugs',
		label: 'Spot a bug',
		description:
			'If something looks off, let us know. Screenshots, device details, and the steps you took help us fix issues fast.',
		actionLabel: 'Report an issue'
	},
	{
		key: 'coffee',
		label: 'Buy us a coffee',
		description:
			'Support us with a cup of coffee so we can keep the site fast, ad-free, and available for everyone who depends on it.',
		actionLabel: 'Support the work'
	}
];

const SupportUs = () => {
	const donationFormRef = useRef(null);
	const [donationAmount, setDonationAmount] = useState('25');

	const quickAmounts = ['10', '25', '50'];

	const handleQuickAmount = (value) => {
		setDonationAmount(value);
	};

	const handleAmountChange = (event) => {
		setDonationAmount(event.target.value);
	};

	const scrollToDonation = () => {
		if (!donationFormRef.current) {
			return;
		}

		donationFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	const handleDonationSubmit = (event) => {
		event.preventDefault();
	};

	const handleCopyLink = () => {
		if (typeof window === 'undefined') {
			return;
		}

		const siteUrl = window.location.origin;
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(siteUrl);
		} else {
			const input = document.createElement('input');
			input.value = siteUrl;
			document.body.appendChild(input);
			input.select();
			document.execCommand('copy');
			document.body.removeChild(input);
		}
	};

	return (
		<div className="support-page">
			<section className="support-hero">
				<div className="support-hero-layout">
					<div className="support-hero-copy">
						<span className="support-hero-eyebrow">Keep OClock thriving</span>
						<h1>Support A Free, Ad-free Timezone Toolkit</h1>
						<p>
							OClock helps you view, compare, and convert time across the world. Community support keeps it fast, accurate, and
							available to everyone without paywalls or distractions.
						</p>
						<div className="support-hero-actions">
							<button type="button" className="support-cta" onClick={handleCopyLink}>
								Share OClock
							</button>
							<a className="support-cta ghost" href="mailto:hello@oclock.app?subject=OClock%20feedback">
								Send feedback
							</a>
						</div>
						<dl className="support-pillars">
							<div>
								<dt>Ad-free today</dt>
								<dd>No pop-ups. No trackers. Just the tools you need.</dd>
							</div>
							<div>
								<dt>Community-led</dt>
								<dd>Your feedback directly shapes releases.</dd>
							</div>
							<div>
								<dt>Free for everyone</dt>
								<dd>No tiers. Full access for learners & teams.</dd>
							</div>
						</dl>
					</div>

					<aside ref={donationFormRef} className="donation-panel" aria-label="Donation form">
						<h2 className="donation-panel-title">Support</h2>
						<p className="donation-panel-tagline">Support development & keep OClock ad‑free.</p>
						<form className="support-donate-form" onSubmit={handleDonationSubmit}>
							<div className="stripe-badge">Powered by Stripe</div>
							<fieldset>
								<legend>Select support amount</legend>
								<div className="donation-quick-grid">
									{quickAmounts.map((value) => {
										const active = donationAmount === value;
										return (
											<button
												type="button"
												key={value}
												className={`donation-chip${active ? ' donation-chip-active' : ''}`}
												onClick={() => handleQuickAmount(value)}
											>
												${value}
											</button>
										);
									})}
								</div>
								<label className="donation-input-label" htmlFor="donation-amount">
									Or custom amount
								</label>
								<div className="donation-amount-input">
									<span aria-hidden="true">$</span>
									<input
										id="donation-amount"
										type="number"
										min="1"
										step="1"
										value={donationAmount}
										onChange={handleAmountChange}
										required
									/>
								</div>
							</fieldset>

							<div className="donation-input-grid">
								<label htmlFor="donation-name">
									<span>Name</span>
									<input id="donation-name" type="text" name="name" placeholder="Your name" required />
								</label>
								<label htmlFor="donation-email">
									<span>Email</span>
									<input id="donation-email" type="email" name="email" placeholder="you@example.com" required />
								</label>
							</div>

							<label htmlFor="donation-note" className="donation-note-label">
								<span>Message (optional)</span>
								<textarea
									id="donation-note"
									name="note"
									placeholder="Say hello or tell us what helps you."
									rows={3}
								></textarea>
							</label>

							<div className="donation-submit">
								<button type="submit" className="support-cta">
									Continue to Stripe
								</button>
								<p className="donation-disclaimer">
									We redirect you to Stripe for secure payment. No card data ever touches OClock.
								</p>
							</div>
						</form>
					</aside>
				</div>
			</section>

			<section className="support-section">
				<div className="support-section-heading">
					<h2>What your support sustains</h2>
					<p>
						Everything below is live today and used daily by people scheduling across continents. Your encouragement keeps
						these tools polished and reliable.
					</p>
				</div>

				<div className="support-features">
					{featureHighlights.map((feature) => {
						const { key, Icon, title, description } = feature;

						return (
							<article key={key} className="support-feature-card">
								<span className="support-feature-icon" aria-hidden="true">
									<Icon className="support-feature-icon-svg" />
								</span>
								<h3>{title}</h3>
								<p>{description}</p>
								<Link to={`/${key === 'clock' ? 'clock' : key}`} className="support-feature-link">
									Explore
									<span aria-hidden="true"> →</span>
								</Link>
							</article>
						);
					})}
				</div>
			</section>

			<section className="support-section support-section-alt">
				<div className="support-section-heading">
					<h2>Ways to support OClock</h2>
					<p>Pick the approach that fits you—every action helps this stay a trusted tool.</p>
				</div>

				<div className="support-grid">
					{supportIdeas.map(({ key, label, description, actionLabel }) => {
						let onClick;
						let href;
						let isExternal = false;

						if (key === 'share') {
							onClick = handleCopyLink;
						} else if (key === 'feedback') {
							href = 'mailto:hello@oclock.app?subject=OClock%20feedback';
						} else if (key === 'bugs') {
							href = 'mailto:hello@oclock.app?subject=OClock%20bug%20report';
						} else if (key === 'coffee') {
							onClick = scrollToDonation;
						}

						return (
							<article key={key} className="support-card">
								<h3>{label}</h3>
								<p>{description}</p>
								<div className="support-card-action">
									{onClick ? (
										<button type="button" onClick={onClick} className="support-link">
											{actionLabel}
										</button>
									) : (
										<a
											className="support-link"
											href={href}
											target={isExternal ? '_blank' : undefined}
											rel={isExternal ? 'noopener noreferrer' : undefined}
										>
											{actionLabel}
										</a>
									)}
								</div>
							</article>
						);
					})}
				</div>
			</section>


			<section className="support-cta-section">
				<div className="support-cta-content">
					<h2>Stay in touch</h2>
					<p>
						We read every message. Share how OClock fits into your day or what you would love to see next—we build from that
						feedback.
					</p>
					<a className="support-cta" href="mailto:hello@oclock.app?subject=Say%20hello%20to%20OClock">
						Write to us
					</a>
				</div>
			</section>
		</div>
	);
};

export default SupportUs;
