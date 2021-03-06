// Code generated by Wire. DO NOT EDIT.

//go:generate wire
//+build !wireinject

package synclet

import (
	"context"

	"github.com/tilt-dev/tilt/internal/container"
	"github.com/tilt-dev/tilt/internal/docker"
)

// Injectors from wire.go:

func WireSynclet(ctx context.Context, runtime container.Runtime) (*Synclet, error) {
	clusterEnv := docker.ProvideEmptyClusterEnv()
	localEnv := docker.ProvideLocalEnv(ctx, clusterEnv)
	localClient := docker.ProvideLocalCli(ctx, localEnv)
	client := docker.ProvideLocalAsDefault(localClient)
	synclet := NewSynclet(client)
	return synclet, nil
}
