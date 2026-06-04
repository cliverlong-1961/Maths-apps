export const differentiationTopics = [
  {
    id: "functions",
    title: "Functions",
    
    dependsOn: [],
  },
  {
    id: "gradients",
    title: "Gradients",
    
    dependsOn: [],
  },
  {
    id: "limits",
    title: "Limits",
    
    dependsOn: [],
  },
  {
    id: "derivative-definition",
    title: "Derivative as a Limit",
    
    dependsOn: ["functions", "gradients", "limits"],
  },
  {
    id: "power-rule",
    title: "Power Rule",
    
    specRef: "3.6.1",

    summary:
      "Differentiate xⁿ using d/dx(xⁿ)=nxⁿ⁻¹.",
    dependsOn: ["derivative-definition"],
  },
  {
    id: "stationary-points",
    title: "Stationary Points",
    
    dependsOn: ["power-rule"],
  },
  {
  id: "chain-rule",
  title: "Chain Rule",
  
  dependsOn: ["power-rule"],
  },
  {
  id: "product-rule",
  title: "Product Rule",
  
  dependsOn: ["power-rule"],
  },
];