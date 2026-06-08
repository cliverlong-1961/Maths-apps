import type { Topic } from "../types/Topic";

export const differentiationTopics: Topic[] = [
  {
    id: "gradients",
    title: "Gradients",
    
    dependsOn: [],
  },

  {
    id: "functions",
    title: "Functions",
    
    dependsOn: [],
  },

  {
    id: "limits",
    title: "Limits",
    
    dependsOn: [],
  },
    {
    id: "curvature",
    title: "Curvature",
    url: "https://maths-apps.crlong.uk/Pure/Concavity/concavity.html",
    dependsOn: ["gradients"],
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
    url: "https://maths-apps.crlong.uk/Pure/St_pts_and_2dn_deriv/Stationary-points.html",
    dependsOn: ["power-rule","gradients"],
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
  {
  id: "implicit-diffn",
  title: "Implicit Differentiation",
  url: "https://maths-apps.crlong.uk/Pure/practise-probs/implicit-diffn/implicit-differentiation.html",
  dependsOn: ["chain-rule"],
  },
];
