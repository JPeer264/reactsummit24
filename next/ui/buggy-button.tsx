'use client';

import { create } from '#/app/error-handling/actions';
import Button from '#/ui/button';
import React from 'react';

export default function BuggyButton() {
  return (
    <form action={create}>
      <Button kind="error" type="submit">
        Trigger Error
      </Button>
    </form>
  );
}
