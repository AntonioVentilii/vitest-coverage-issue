import { isNullish } from '@dfinity/utils';

interface CommonParams {
	sliderFrame: HTMLElement | undefined;
}

/**
 * A util for building carousel slider frame item.
 */
export const buildCarouselSliderFrameItem = ({
	slide,
	totalSlides
}: {
	slide: Node;
	totalSlides: number;
}): HTMLDivElement => {
	// Create slider frame item and apply styling
	// TODO: check if slide is an HTMLElement and if so, only set width w/o creating a new div
	const frameItem = document.createElement('div');

	if (totalSlides > 0) {
		frameItem.style.width = `${100 / totalSlides}%`;
	}

	frameItem.appendChild(slide);

	return frameItem;
};

/**
 * A util for extending provided sliderFrame element with carousel items and width style..
 */
export const extendCarouselSliderFrame = ({
	sliderFrame,
	slides,
	slideWidth
}: {
	slides: Node[];
	slideWidth: number;
} & CommonParams) => {
	if (isNullish(sliderFrame) || slides.length === 0) {
		return;
	}

	// Clean previous HTML if the frame is being re-built (e.g. in case of window resize)
	sliderFrame.innerHTML = '';

	// TODO: use Svelte 5 and/or pure CSS in order to avoid the hacky solution
	// We add the last slide as the first element to properly animate last-to-first slide transition.
	// The same applies to the last element - we use the first slide as the last item of the array.
	const extendedSlides = [
		slides[slides.length - 1].cloneNode(true),
		...slides,
		slides[0].cloneNode(true)
	];
	const totalSlides = extendedSlides.length;

	// Calculate and set width for CSS transform to work correctly
	sliderFrame.style.width = `${slideWidth * totalSlides}px`;

	sliderFrame.append(
		...extendedSlides.map((slide) =>
			buildCarouselSliderFrameItem({
				slide,
				totalSlides
			})
		)
	);
};
