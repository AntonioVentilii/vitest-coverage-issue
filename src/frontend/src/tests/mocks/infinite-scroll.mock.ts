export const IntersectionObserverPassive = vi.fn();
IntersectionObserverPassive.mockReturnValue({
	observe: () => null,
	unobserve: () => null,
	disconnect: () => null
});

