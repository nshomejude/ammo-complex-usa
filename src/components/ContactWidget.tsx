import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ContactWidgetProps {
  variant?: "default" | "compact" | "sidebar";
  className?: string;
}

export const ContactWidget = ({ variant = "default", className = "" }: ContactWidgetProps) => {
  const isCompact = variant === "compact";
  const isSidebar = variant === "sidebar";
  
  return (
    <Card className={`border-tactical/20 bg-tactical/5 ${className}`}>
      <CardHeader className={`${isCompact || isSidebar ? "p-4 pb-3" : "p-6 pb-4"}`}>
        <CardTitle className={`${isCompact || isSidebar ? "text-sm" : "text-base"} font-semibold flex items-center gap-2`}>
          <Phone className={`${isCompact || isSidebar ? "h-4 w-4" : "h-5 w-5"} text-tactical`} />
          {isSidebar ? "Need Help?" : "Contact Our Team"}
        </CardTitle>
      </CardHeader>
      <CardContent className={`${isCompact || isSidebar ? "p-4 pt-0" : "p-6 pt-0"} space-y-4`}>
        <p className={`${isCompact || isSidebar ? "text-xs" : "text-sm"} text-muted-foreground`}>
          {isSidebar 
            ? "Our experts are ready to assist you with product selection and licensing requirements."
            : "Have questions about our products, licensing requirements, or ordering process? Our team is here to help."}
        </p>
        <div className="space-y-3">
          <a 
            href="tel:+1-555-FIREARMS" 
            className={`flex items-center gap-3 ${isCompact || isSidebar ? "text-xs" : "text-sm"} hover:text-tactical transition-colors group`}
          >
            <div className={`flex items-center justify-center ${isCompact || isSidebar ? "h-8 w-8" : "h-10 w-10"} rounded-lg bg-tactical/10 group-hover:bg-tactical/20 transition-colors`}>
              <Phone className={`${isCompact || isSidebar ? "h-3.5 w-3.5" : "h-4 w-4"} text-tactical`} />
            </div>
            <div>
              <p className="font-medium">+1 (555) FIREARMS</p>
              {!isCompact && !isSidebar && <p className="text-xs text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>}
            </div>
          </a>
          <a 
            href="mailto:info@armscomplex.com" 
            className={`flex items-center gap-3 ${isCompact || isSidebar ? "text-xs" : "text-sm"} hover:text-tactical transition-colors group`}
          >
            <div className={`flex items-center justify-center ${isCompact || isSidebar ? "h-8 w-8" : "h-10 w-10"} rounded-lg bg-tactical/10 group-hover:bg-tactical/20 transition-colors`}>
              <Mail className={`${isCompact || isSidebar ? "h-3.5 w-3.5" : "h-4 w-4"} text-tactical`} />
            </div>
            <div>
              <p className="font-medium">info@armscomplex.com</p>
              {!isCompact && !isSidebar && <p className="text-xs text-muted-foreground">Response within 24 hours</p>}
            </div>
          </a>
        </div>
        <Button asChild variant="outline" size={isCompact || isSidebar ? "sm" : "default"} className={`w-full ${isCompact || isSidebar ? "text-xs" : "text-sm"}`}>
          <Link to="/contact">
            <MessageCircle className={`${isCompact || isSidebar ? "mr-1.5 h-3 w-3" : "mr-2 h-4 w-4"}`} />
            Contact Form
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
