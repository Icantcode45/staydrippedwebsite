// Widget initialization for IV Menu page
function initializeWidgets() {
  // Service configurations
  const services = [
    {
      id: "rehydrate-widget",
      serviceId: "73e00621-4069-486a-9fa8-a5a94a089618",
    },
    {
      id: "rehydrate-plus-widget",
      serviceId: "ae66ce7c-fa68-408c-9ab0-a04b287f6b31",
    },
    {
      id: "jr-myers-widget",
      serviceId: "065ab682-3334-403a-9635-ea461e520a6d",
    },
    { id: "myers-widget", serviceId: "c13f904a-a8d0-43b1-bd5f-570387ee77d6" },
    {
      id: "mega-myers-widget",
      serviceId: "e14cdb17-a9d1-47cb-90e1-d3050059bcf3",
    },
    {
      id: "hangover-widget",
      serviceId: "a7d83ea1-cf5e-4865-923e-bfe2232de898",
    },
    {
      id: "arizona-detox-widget",
      serviceId: "3fb4cbbb-5e12-447c-a236-869573ef730f",
    },
    { id: "gold-widget", serviceId: "3519d39a-31ac-4944-80c9-4eb667a13df4" },
    {
      id: "platinum-widget",
      serviceId: "0c0c56b7-85a4-4e01-9b9c-180bc714fa94",
    },
    { id: "nad-widget", serviceId: "7c8dcca4-35b4-44bd-a242-d1fdc722ddb5" },
    {
      id: "diamond-nad-widget",
      serviceId: "ddf30134-b441-4226-bfe9-27eed5368949",
    },
  ];

  services.forEach((service, index) => {
    setTimeout(() => {
      createWidget(service);
    }, index * 500);
  });
}

function createWidget(service) {
  const container = document.getElementById(service.id);
  if (container) {
    window.intakeqServiceId = service.serviceId;
    const widgetDiv = document.createElement("div");
    widgetDiv.id = `intakeq-${service.id}`;
    widgetDiv.style.maxWidth = "100%";
    widgetDiv.style.width = "100%";
    widgetDiv.style.minHeight = "400px";
    container.appendChild(widgetDiv);
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(initializeWidgets, 1000);
});
