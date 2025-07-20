import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 py-6">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} Vikas Ravikumar Karjigi. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
